from flask import jsonify

def validate_request_data(required_fields, data):
    """Validate API request payload"""
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({
            "error": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400
    return None

def error_response(message, code=400):
    """Standard error response format"""
    return jsonify({"error": message}), code