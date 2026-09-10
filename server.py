#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NHG Japanese Learning Platform - Local Development & AI Proxy Server
Provides:
1. Static web file server (HTTP GET/HEAD)
2. Safe local proxy for Qwen (DashScope) API with CORS enabled (POST /api/chat)
No external dependencies required (Pure Python standard library).
"""

import sys
import os
import json
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler

DASHSCOPE_COMPLETION_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

class NHGRequestHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Prefer serving from dist/ for production Vue 3 build
        dist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
        if os.path.exists(dist_dir):
            clean_path = path.split("?", 1)[0].split("#", 1)[0]
            if clean_path in ["", "/", "/index.html"]:
                return os.path.join(dist_dir, "index.html")
            if clean_path.startswith("/assets/"):
                return os.path.join(dist_dir, clean_path.lstrip("/"))
            if clean_path.startswith("/audio/"):
                return os.path.join(dist_dir, clean_path.lstrip("/"))
        return super().translate_path(path)

    def end_headers(self):
        # Enable CORS for all responses
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        super().end_headers()

    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/chat" or self.path == "/api/qwen":
            self.handle_qwen_proxy()
        else:
            self.send_error(404, "Endpoint Not Found")

    def handle_qwen_proxy(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode("utf-8"))
            except Exception as e:
                self.send_json_error(400, f"Invalid JSON payload: {str(e)}")
                return

            # Extract API key from Authorization header or payload
            auth_header = self.headers.get("Authorization", "")
            api_key = ""
            if auth_header.startswith("Bearer "):
                api_key = auth_header[7:].strip()
            elif "apiKey" in payload:
                api_key = payload.pop("apiKey")

            if not api_key:
                self.send_json_error(401, "Missing Qwen API Key. Please configure your API key in AI settings.")
                return

            # Prepare upstream request to DashScope
            upstream_headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            
            req_data = json.dumps(payload).encode("utf-8")
            upstream_req = urllib.request.Request(
                DASHSCOPE_COMPLETION_URL,
                data=req_data,
                headers=upstream_headers,
                method="POST"
            )

            try:
                with urllib.request.urlopen(upstream_req, timeout=60) as resp:
                    resp_data = resp.read()
                    self.send_response(resp.status)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.end_headers()
                    self.wfile.write(resp_data)
            except urllib.error.HTTPError as he:
                err_body = he.read().decode("utf-8", errors="ignore")
                self.send_response(he.code)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(err_body.encode("utf-8"))
            except urllib.error.URLError as ue:
                self.send_json_error(502, f"Failed to connect to DashScope API: {str(ue.reason)}")
            except Exception as e:
                self.send_json_error(500, f"Upstream proxy error: {str(e)}")

        except Exception as e:
            self.send_json_error(500, f"Server internal error: {str(e)}")

    def send_json_error(self, code, message):
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        err_obj = {"error": {"message": message, "code": code}}
        self.wfile.write(json.dumps(err_obj, ensure_ascii=False).encode("utf-8"))


class ReusableHTTPServer(HTTPServer):
    allow_reuse_address = True

def run(port=8080):
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(workspace_dir)
    httpd = None
    target_port = port
    for p in [port, 8081, 8082, 8088]:
        try:
            httpd = ReusableHTTPServer(("", p), NHGRequestHandler)
            target_port = p
            break
        except OSError:
            continue

    if not httpd:
        print(f"❌ 无法绑定端口 {port} 或备用端口 (8081, 8082)")
        sys.exit(1)

    print("=" * 60)
    print(f"🚀 NHG 对日实战学习平台 本地服务已启动：")
    print(f"   👉 访问地址: http://localhost:{target_port}")
    print(f"   🤖 通义千问代理: http://localhost:{target_port}/api/chat")
    print(f"   📁 根目录: {workspace_dir}")
    print("=" * 60)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已平稳停止。")
        httpd.server_close()


if __name__ == "__main__":
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run(port)

