import { RefObject } from 'react';

const focusReplyDialogInput = (inputReference: RefObject<HTMLInputElement>) => {
  setTimeout(() => {
    inputReference.current?.focus();
  }, 0);
};

export default focusReplyDialogInput;
