from threading import Lock

_lock = Lock()
_states = {}

def get_state(contact_number: str):
    with _lock:
        return _states.get(contact_number)

def set_state(contact_number: str, state: dict):
    with _lock:
        _states[contact_number] = state

def clear_state(contact_number: str):
    with _lock:
        _states.pop(contact_number, None)
