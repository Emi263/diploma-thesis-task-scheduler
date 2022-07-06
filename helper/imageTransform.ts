export function encodeImageFileAsURL(element) {
  let file = element;
  let reader = new FileReader();
  reader.onloadend = function () {};
  reader.readAsDataURL(file);
}
