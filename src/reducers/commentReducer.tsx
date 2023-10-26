export enum CommentActions {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

interface CommentAction {
  type: CommentActions;
  payload: string;
}

interface CommentState {
  text: string;
}

export default function commentReducer(
  state: CommentState,
  action: CommentAction
) {
  const { type, payload } = action;
  switch (type) {
    case CommentActions.ADD: {
      console.log(payload);
      return { ...state, text: payload };
    }
    case CommentActions.EDIT: {
    }
    case CommentActions.DELETE: {
      return { ...state, text: payload };
    }
    default:
      return state;
  }
}
