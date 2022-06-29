export function encodeImageFileAsURL(element) {
  let file = element;
  let reader = new FileReader();
  reader.onloadend = function () {
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(file);
}
