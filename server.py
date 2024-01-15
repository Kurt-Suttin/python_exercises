from http.server import BaseHTTPRequestHandler, HTTPServer
import os

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # Determine the requested file
        if self.path == '/':
            file_path = './templates/index.html'
        else:
            # Handle static files, assuming the URL path matches the file structure in 'static'
            file_path = '.' + self.path

        # Check if file exists
        if os.path.exists(file_path):
            self.send_response(200)
            # Set the appropriate header based on file type
            if file_path.endswith(".html"):
                self.send_header('Content-type', 'text/html')
            elif file_path.endswith(".css"):
                self.send_header('Content-type', 'text/css')
            elif file_path.endswith(".js"):  # Added condition for JavaScript files
                self.send_header('Content-type', 'application/javascript')
            self.end_headers()

            # Read and send the content of the file
            with open(file_path, 'rb') as file:
                content = file.read()
                self.wfile.write(content)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'404 Not Found')

if __name__ == '__main__':
    port = 8080
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Server running on port {port}...')
    httpd.serve_forever()
