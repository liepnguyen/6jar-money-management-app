import { Toast } from "native-base";

export const showWarningMessage = (message) => {
  Toast.show({
    text: message,
    position: 'bottom',
    type: 'warning',
    buttonText: 'OK',
    duration: 5000,
  });
}