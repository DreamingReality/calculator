class UiUtil {
    /**
     * Creates a list of html elements from the given list
     * each item of the list must contain at least tagName
     * @param {array} list list of objects from which to create the elements
     * @returns {arary} list with created html elements
     */
    static createElements(list) {
        let elementList = [];
        list.forEach((item) => {
            if (item.tagName) {
                let elm = document.createElement(item.tagName);
                Object.keys(item).forEach((key) => {
                    if (key === 'dataset') {
                        let itemData = item[key];
                        Object.keys(itemData).forEach((prop) => {
                            elm.dataset[prop] = itemData[prop];
                        });
                    } else if (key !== 'tagName') {
                        elm[key] = item[key];
                    }
                });
                elementList.push(elm);
            }
        });
        return elementList;
    }

    /**
     * Creates a list of html elements from the given list
     * each item of the list must contain at least tagName
     * first element in the list will be the parent, the other elements will be added as children of the parent
     * @param {array} list list of objects from which to create the elements
     * @returns {HtmlElement} parent element which contain all children (if any)
     */
    static createParentAndChildren(list) {
        let elementList = this.createElements(list);
        let parentElement = elementList.shift();
        elementList.forEach((item) => {
            parentElement.appendChild(item);
        });

        return parentElement;
    }
}
