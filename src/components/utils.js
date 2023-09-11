function waitingSave(loading, button) {
    const buttonText = button.textContent.replace(/[\s.,%]/g, '');
    const waitingText =`${buttonText} ...`
    if (loading) {
      button.textContent = waitingText;
    } else {
      button.textContent = buttonText.replace(/[\s.,%]/g, '');
    }
  }

  export {waitingSave}