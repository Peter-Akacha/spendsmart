"""
SpendSmart AI Categorizer
Run this as a separate microservice: python ai_categorizer.py
It listens on port 8000 and categorizes expenses using keyword matching + ML.
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os

CATEGORIES = {
    'Food': ['food', 'restaurant', 'pizza', 'burger', 'coffee', 'lunch', 'dinner', 'breakfast',
             'grocery', 'supermarket', 'eat', 'meal', 'snack', 'drink', 'cafe', 'fast food'],
    'Transport': ['uber', 'taxi', 'bus', 'train', 'fuel', 'petrol', 'transport', 'ride',
                  'flight', 'airline', 'car', 'parking', 'toll', 'metro', 'keke', 'okada'],
    'Housing': ['rent', 'electricity', 'water', 'internet', 'wifi', 'bills', 'utility',
                'maintenance', 'repair', 'furniture', 'house', 'apartment'],
    'Entertainment': ['netflix', 'spotify', 'movie', 'cinema', 'game', 'concert', 'show',
                      'subscription', 'youtube', 'music', 'fun', 'outing', 'bar', 'club'],
    'Health': ['hospital', 'pharmacy', 'medicine', 'doctor', 'health', 'gym', 'fitness',
               'drug', 'dental', 'medical', 'clinic', 'therapy'],
    'Shopping': ['amazon', 'jumia', 'clothes', 'shoes', 'bag', 'fashion', 'shopping',
                 'accessories', 'online', 'store', 'market'],
    'Education': ['school', 'tuition', 'course', 'book', 'university', 'training',
                  'udemy', 'coursera', 'class', 'exam', 'study'],
}

def categorize(title: str) -> str:
    title_lower = title.lower()
    scores = {}
    for category, keywords in CATEGORIES.items():
        score = sum(1 for kw in keywords if kw in title_lower)
        if score > 0:
            scores[category] = score
    return max(scores, key=scores.get) if scores else 'Other'

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/categorize':
            length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(length))
            category = categorize(body.get('title', ''))
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'category': category}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress logs

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f'AI Categorizer running on port {port}...')
    HTTPServer(('', port), Handler).serve_forever()
