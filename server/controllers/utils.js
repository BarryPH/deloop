/**
 * Filter an object by list of whitelisted keys
 * @param {object} dirtyObject - Object to be filtered
 * @param {array} keyWhiteList - Keys to retun
 * @returns {array}
 */
function filterObject(dirtyObject, keyWhiteList) {
	return Object.keys(dirtyObject)
		.filter(key => keyWhiteList.includes(key))
		// eslint-disable-next-line arrow-body-style
		.reduce((cleanObject, key) => {
			return Object.assign(cleanObject, { [key]: dirtyObject[key] });
		}, {});
}

module.exports.cleanUser = (user) => {
	const keyWhiteList = ['_id', 'name', 'email', 'website'];
	return filterObject(user, keyWhiteList);
};
