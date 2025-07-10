from flask import Blueprint, session, request, jsonify
from app import db
from app.models import User, Todo


todo_bp = Blueprint("todo", __name__)

@todo_bp.route("/get-todo", methods=["GET"])
def getTodoList():
    try:
            
        logged_in_user = session.get("user_id")

        if not logged_in_user:
            return jsonify({"status": False, "message": "User not found."}), 400
        
        all_todo = Todo.query.filter_by(user_id = logged_in_user).all()

        todo_list = []

        for todo in all_todo:
            todo_list.append({
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "status": todo.status
            })
            
        return jsonify({"status": True, "data": todo_list}), 200

    except Exception as e:
        return jsonify({"message":f"Error occurred: {e}"})


@todo_bp.route("/add-todo", methods=["POST"])
def addTodo():
    try:
        logged_in_user = session.get("user_id")
        if not logged_in_user:
            return jsonify({"status": False, "message": "User not found."}), 400

        data = request.get_json()
        title = data.get("title", "").strip()
        description = data.get("description", "").strip()
        status = False

        if not title or not description:
            return jsonify({"status": False, "message": "Title and Description are required field"}), 400
        
        new_todo = Todo(title = title, description = description, status = status, user_id = logged_in_user)
        db.session.add(new_todo)
        db.session.commit()

        return jsonify({"status": True, "message": "To-Do added successfully!"}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500


@todo_bp.route("/update-todo/<int:todo_id>", methods=["POST"])
def updateTodo(todo_id):
    try:
        logged_in_user = session.get("user_id")
        if not logged_in_user:
            return jsonify({"status": False, "message": "User not found."}), 400
        
        get_todo = Todo.query.filter_by(id = todo_id, user_id = logged_in_user).first()

        if not todo_id:
            return jsonify({"status": False, "message": "No todo found for respective todo_id"}), 400
        
        data = request.get_json()
        title = data.get("title", "").strip()
        description = data.get("description", "").strip()

        get_todo.title = title
        get_todo.description = description
        get_todo.status = False

        db.session.commit()
        return jsonify({"status": True, "message": "Todo updated successfully."}), 200

    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500


@todo_bp.route("/delete-todo/<int:todo_id>", methods=["POST"])
def deleteTodo(todo_id):
    try:
        logged_in_user = session.get("user_id")
        if not logged_in_user:
            return jsonify({"status": False, "message": "User not found."}), 400

        
        get_todo = Todo.query.filter_by(id = todo_id, user_id = logged_in_user).first()
        if not get_todo:
            return jsonify({"status": False, "message": "No todo found for respective todo_id"}), 400
        
        db.session.delete(get_todo)
        db.session.commit()

        return jsonify({"status": True, "message": "To-do deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500
    

@todo_bp.route("/change-status/<int:todo_id>", methods=["POST"])
def changeStatus(todo_id):
    try:
        logged_in_user = session.get("user_id")
        if not logged_in_user:
            return jsonify({"status": False, "message": "User not found."}), 400

        get_todo = Todo.query.filter_by(id = todo_id, user_id = logged_in_user).first()
        if not get_todo:
            return jsonify({"status": False, "message": "No todo found for respective todo_id"}), 400
        
        data = request.get_json()
        status = data.get("status", "")

        get_todo.status = status
        db.session.commit()

        return jsonify({"status": True, "message": "Status updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Error occurred: {e}"}) ,500