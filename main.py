from flask import Flask, request
import pyautogui
from random import randrange


codes = []

app = Flask(__name__)

CODE_INPUT_HTML = '''
<!DOCTYPE html>
<html>
    <head>
        <title>HTTP Keyboard</title>
    </head>
    <body>
        <script>
            const code = prompt('Code:');
            localStorage.setItem('code', code);
        </script>

        <script>
            const moveMouse = direction => {
                fetch(`${window.location.origin}/api/movemouse?direction=${direction}&code=${localStorage.getItem('code')}`)
            };
        </script>

        <button onclick='moveMouse("left")'>LEFT</button>
        <button onclick='moveMouse("right")'>RIGHT</button>
        <button onclick='moveMouse("up")'>UP</button>
        <button onclick='moveMouse("down")'>DOWN</button>
    </body>
</html>
'''


def check_code():
    code = request.args.get('code')
    
    if not code: return 'No code given', 400
    if code not in codes: return 'Code is invalid', 400

    return None


def check_move_mouse_direction():
    direction = request.args.get('direction')

    if not direction: return 'No direction given', 400

    if direction not in ('left', 'right', 'up', 'down'):
        return 'Direction is invalid', 400


@app.route('/', methods=['GET'])
def root():
    code = str(randrange(10000))

    codes.append(code)
    print(f'CODE: {code}')

    return CODE_INPUT_HTML, 200


@app.route('/api/movemouse', methods=['GET'])
def move_mouse():
    if error := check_code(): return error
    if error := check_move_mouse_direction(): return error

    direction = request.args.get('direction')

    pyautogui.move(*{
        'left': (-10, 0),
        'right': (10, 0),
        'up': (0, -10),
        'down': (0, 10)
    }[direction])

    return 'Success', 200


@app.route('/api/presskey', methods=['GET'])
def press_key():
    # TODO: do this
    pass



if __name__ == '__main__':
    app.run(debug=True)
