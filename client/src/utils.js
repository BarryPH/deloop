/**
 * Return form data in JSON format
 * @param {element} Form element to extract data from
 * @returns {JSON}
 */
function formToJSON(formElem) {
	const formData = new FormData(formElem);
	const keys = Array.from(formData.keys());

	// eslint-disable-next-line arrow-body-style
	return keys.reduce((object, key) => {
		return Object.assign(object, { [key]: formData.get(key) });
	}, {});
}

export default {
	formToJSON,
};
