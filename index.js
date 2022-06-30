/* eslint-disable no-param-reassign */
const dropdown = (() => {
  const menuMethods = {
    add(textOrElement, onClickFunction) {
      const item = document.createElement('div');

      // if passed an element, append it to the item, otherwise insert text
      if (textOrElement instanceof Element) {
        item.appendChild(textOrElement);
      } else {
        item.innerText = textOrElement;
      }

      item.style.padding = '10px 6px';
      item.style.borderRadius = '0';
      if (this.menu.hasChildNodes()) {
        item.style.borderTop = '1px solid rgba(0,0,0,0.05)';
      }
      this.menu.appendChild(item);

      // binding passed function to run on click
      item.onclick = onClickFunction;

      // adding hover effect
      item.style.transition = 'background 100ms ease-in-out';
      item.onmouseover = function itemHovered() {
        this.style.backgroundColor = 'rgba(180,180,180,0.1)';
      };
      item.onmouseleave = function removedHover() {
        this.style.backgroundColor = '';
      };

      this.updatePosition();

      return item;
    },

    updatePosition() {
      // horizontally centers the menu to the parent element
      this.menu.style.left = `${(this.element.offsetWidth
        - this.menu.offsetWidth) / 2}px`;
    },
  };

  const togglemenu = (menu) => {
    if (menu.style.visibility === 'hidden') {
      menu.style.transform = 'scale(1)';
      menu.style.visibility = 'visible';
    } else {
      menu.style.transform = 'scale(0.5, 0)';
      menu.style.visibility = 'hidden';
    }
  };

  const create = (TriggeringElement, defaultStyling = true) => {
    const element = TriggeringElement;
    if (!(element instanceof Element)) return null;
    if (!(element.style.position === 'absolute'
    || element.style.position === 'fixed'
    || element.style.position === 'sticky')) {
      element.style.position = 'relative';
    }

    const menu = document.createElement('div');
    menu.style.minHeight = '20px';
    menu.style.minWidth = '20px';
    menu.style.position = 'absolute';

    if (defaultStyling) {
      menu.style.backgroundColor = '#f5f5f5';
      menu.style.color = '#404040';
      menu.style.fontFamily = '\'Segoe UI\', Tahoma, Geneva, Verdana, Arial, sans-serif';
      menu.style.border = '1px solid #e5e5e5';
    }

    menu.style.top = '100%';
    menu.style.left = '0';
    menu.style.right = '0';
    menu.style.width = 'max-content';
    menu.style.maxWidth = '400px';
    menu.style.marginTop = '8px';

    menu.style.transformOrigin = 'top';
    menu.style.transition = 'all 0.2s ease-in-out';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.justifyItems = 'center';
    menu.style.textAlign = 'center';
    menu.style.borderRadius = '12px';
    menu.style.zIndex = '10';
    menu.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px';
    menu.style.overflow = 'hidden';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'scale(0.5, 0)';
    menu.style.userSelect = 'none';
    menu.style.padding = '4px';

    element.onclick = () => {
      togglemenu(menu);
    };

    element.appendChild(menu);
    const dropdownObject = Object.create(menuMethods);
    dropdownObject.element = element;
    dropdownObject.menu = menu;
    return (dropdownObject);
  };

  return { create };
})();

export default dropdown;
