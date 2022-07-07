from flask import Flask, request
from flask_cors import CORS
import pyautogui
from random import randrange


app = Flask(__name__)
CORS(app)


def check_code():
    code = request.args.get('code')

    if not code: return 'No code given', 400

    with open('code.txt', 'r') as f:
        if code != f.read(): return 'Code is invalid', 400

    return None


def check_move_mouse_xy():
    xy = request.args.get('xy')

    if not xy: return 'No xy given', 400

    try:
        split = xy.split(',')
        int(split[0])
        int(split[1])
    except ValueError:
        return 'xy is invalid'

    if len(xy.split(',')) != 2:
        return 'xy is invalid'

    return None


def check_keyboard_key():
    key = request.args.get('key')

    if not key: return 'No key given', 400
    if key not in pyautogui.KEYBOARD_KEYS: return 'Key is invalid', 400

    return None


# Authenticate
@app.route('/api/code', methods=['GET'])
def root():
    code = str(randrange(10000))

    print('Connection from:')
    print(request.headers.get('user-agent'))

    # TODO: make this GUI
    while (allow := input('Allow? (Y/n) ').lower()) not in ['y', 'n']:
        pass

    if allow == 'n':
        return 'Connection rejected', 400

    with open('code.txt', 'w') as f:
        f.write(code)

    print(f'CODE: {code}')

    return 'Success', 200


# Mouse control
@app.route('/api/movemouse', methods=['GET'])
def move_mouse():
    if error := check_code(): return error
    if error := check_move_mouse_xy(): return error

    xy = request.args.get('xy')

    pyautogui.move(list(map(int, xy.split(','))));

    return 'Success', 200


# Keyboard control
@app.route('/api/keydown', methods=['GET'])
def key_down():
    if error := check_code(): return error
    if error := check_keyboard_key(): return error
    
    key = request.args.get('key')

    pyautogui.keyDown(key)

    return 'Success', 200


@app.route('/api/keyup', methods=['GET'])
def key_up():
    if error := check_code(): return error
    if error := check_keyboard_key(): return error
    
    key = request.args.get('key')

    pyautogui.keyUp(key)

    return 'Success', 200


if __name__ == '__main__':
    app.run(debug=True, host='10.34.55.71')
