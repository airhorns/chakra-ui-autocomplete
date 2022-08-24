'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var downshift = require('downshift');
var matchSorter = _interopDefault(require('match-sorter'));
var Highlighter = _interopDefault(require('react-highlight-words'));
var useDeepCompareEffect = _interopDefault(require('react-use/lib/useDeepCompareEffect'));
var formControl = require('@chakra-ui/form-control');
var layout = require('@chakra-ui/layout');
var button = require('@chakra-ui/button');
var input = require('@chakra-ui/input');
var icons = require('@chakra-ui/icons');
var tag = require('@chakra-ui/tag');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function defaultOptionFilterFunc(items, inputValue) {
  return matchSorter(items, inputValue, {
    keys: ['value', 'label']
  });
}

function defaultCreateItemRenderer(value) {
  return React.createElement(layout.Text, null, React.createElement(layout.Box, {
    as: 'span'
  }, "Create"), ' ', React.createElement(layout.Box, {
    as: 'span',
    bg: 'yellow.300',
    fontWeight: 'bold'
  }, "\"", value, "\""));
}

var CUIAutoComplete = function CUIAutoComplete(props) {
  var items = props.items,
      _props$optionFilterFu = props.optionFilterFunc,
      optionFilterFunc = _props$optionFilterFu === void 0 ? defaultOptionFilterFunc : _props$optionFilterFu,
      itemRenderer = props.itemRenderer,
      _props$highlightItemB = props.highlightItemBg,
      highlightItemBg = _props$highlightItemB === void 0 ? 'gray.100' : _props$highlightItemB,
      placeholder = props.placeholder,
      label = props.label,
      listStyleProps = props.listStyleProps,
      labelStyleProps = props.labelStyleProps,
      inputStyleProps = props.inputStyleProps,
      toggleButtonStyleProps = props.toggleButtonStyleProps,
      tagStyleProps = props.tagStyleProps,
      selectedIconProps = props.selectedIconProps,
      listItemStyleProps = props.listItemStyleProps,
      onCreateItem = props.onCreateItem,
      icon = props.icon,
      _props$hideToggleButt = props.hideToggleButton,
      hideToggleButton = _props$hideToggleButt === void 0 ? false : _props$hideToggleButt,
      _props$disableCreateI = props.disableCreateItem,
      disableCreateItem = _props$disableCreateI === void 0 ? false : _props$disableCreateI,
      _props$createItemRend = props.createItemRenderer,
      createItemRenderer = _props$createItemRend === void 0 ? defaultCreateItemRenderer : _props$createItemRend,
      renderCustomInput = props.renderCustomInput,
      downshiftProps = _objectWithoutPropertiesLoose(props, ["items", "optionFilterFunc", "itemRenderer", "highlightItemBg", "placeholder", "label", "listStyleProps", "labelStyleProps", "inputStyleProps", "toggleButtonStyleProps", "tagStyleProps", "selectedIconProps", "listItemStyleProps", "onCreateItem", "icon", "hideToggleButton", "disableCreateItem", "createItemRenderer", "renderCustomInput"]);
  /* States */


  var _React$useState = React.useState(false),
      isCreating = _React$useState[0],
      setIsCreating = _React$useState[1];

  var _React$useState2 = React.useState(''),
      inputValue = _React$useState2[0],
      setInputValue = _React$useState2[1];

  var _React$useState3 = React.useState(items),
      inputItems = _React$useState3[0],
      setInputItems = _React$useState3[1];
  /* Refs */


  var disclosureRef = React.useRef(null);
  /* Downshift Props */

  var _useMultipleSelection = downshift.useMultipleSelection(downshiftProps),
      getSelectedItemProps = _useMultipleSelection.getSelectedItemProps,
      getDropdownProps = _useMultipleSelection.getDropdownProps,
      addSelectedItem = _useMultipleSelection.addSelectedItem,
      removeSelectedItem = _useMultipleSelection.removeSelectedItem,
      selectedItems = _useMultipleSelection.selectedItems;

  var selectedItemValues = selectedItems.map(function (item) {
    return item.value;
  });

  var _useCombobox = downshift.useCombobox({
    inputValue: inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: function onInputValueChange(_ref) {
      var inputValue = _ref.inputValue,
          selectedItem = _ref.selectedItem;
      var filteredItems = optionFilterFunc(items, inputValue || '');

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false);
      }

      if (!selectedItem) {
        setInputItems(filteredItems);
      }
    },
    stateReducer: function stateReducer(state, actionAndChanges) {
      var changes = actionAndChanges.changes,
          type = actionAndChanges.type;

      switch (type) {
        case downshift.useCombobox.stateChangeTypes.InputBlur:
          return _extends({}, changes, {
            isOpen: false
          });

        case downshift.useCombobox.stateChangeTypes.InputKeyDownEnter:
        case downshift.useCombobox.stateChangeTypes.ItemClick:
          return _extends({}, changes, {
            highlightedIndex: state.highlightedIndex,
            inputValue: inputValue,
            isOpen: true
          });

        case downshift.useCombobox.stateChangeTypes.FunctionSelectItem:
          return _extends({}, changes, {
            inputValue: inputValue
          });

        default:
          return changes;
      }
    },
    // @ts-ignore
    onStateChange: function onStateChange(_ref2) {
      var inputValue = _ref2.inputValue,
          type = _ref2.type,
          selectedItem = _ref2.selectedItem;

      switch (type) {
        case downshift.useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || '');
          break;

        case downshift.useCombobox.stateChangeTypes.InputKeyDownEnter:
        case downshift.useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem);
            } else {
              if (onCreateItem && isCreating) {
                onCreateItem(selectedItem);
                setIsCreating(false);
                setInputItems(items);
                setInputValue('');
              } else {
                addSelectedItem(selectedItem);
              }
            } // @ts-ignore


            selectItem(null);
          }

          break;
      }
    }
  }),
      isOpen = _useCombobox.isOpen,
      getToggleButtonProps = _useCombobox.getToggleButtonProps,
      getLabelProps = _useCombobox.getLabelProps,
      getMenuProps = _useCombobox.getMenuProps,
      getInputProps = _useCombobox.getInputProps,
      getComboboxProps = _useCombobox.getComboboxProps,
      highlightedIndex = _useCombobox.highlightedIndex,
      getItemProps = _useCombobox.getItemProps,
      openMenu = _useCombobox.openMenu,
      selectItem = _useCombobox.selectItem,
      setHighlightedIndex = _useCombobox.setHighlightedIndex;

  React.useEffect(function () {
    if (inputItems.length === 0 && !disableCreateItem) {
      setIsCreating(true); // @ts-ignore

      setInputItems([{
        label: "" + inputValue,
        value: inputValue
      }]);
      setHighlightedIndex(0);
    }
  }, [inputItems, setIsCreating, setHighlightedIndex, inputValue, disableCreateItem]);
  useDeepCompareEffect(function () {
    setInputItems(items);
  }, [items]);
  /* Default Items Renderer */

  function defaultItemRenderer(selected) {
    return selected.label;
  }

  return React.createElement(layout.Stack, null, label && React.createElement(formControl.FormLabel, Object.assign({}, _extends({}, getLabelProps({}), labelStyleProps)), label), selectedItems && React.createElement(layout.Stack, {
    spacing: 2,
    isInline: true,
    flexWrap: 'wrap'
  }, selectedItems.map(function (selectedItem, index) {
    return React.createElement(tag.Tag, Object.assign({
      mb: 1
    }, tagStyleProps, {
      key: "selected-item-" + index
    }, getSelectedItemProps({
      selectedItem: selectedItem,
      index: index
    })), React.createElement(tag.TagLabel, null, selectedItem.label), React.createElement(tag.TagCloseButton, {
      onClick: function onClick(e) {
        e.stopPropagation();
        removeSelectedItem(selectedItem);
      },
      "aria-label": 'Remove menu selection badge'
    }));
  })), React.createElement(layout.Stack, Object.assign({
    isInline: true
  }, getComboboxProps()), renderCustomInput ? renderCustomInput(_extends({}, inputStyleProps, getInputProps(getDropdownProps({
    placeholder: placeholder,
    onClick: isOpen ? function () {} : openMenu,
    onFocus: isOpen ? function () {} : openMenu,
    ref: disclosureRef
  }))), _extends({}, toggleButtonStyleProps, getToggleButtonProps(), {
    ariaLabel: 'toggle menu',
    hideToggleButton: hideToggleButton
  })) : React.createElement(React.Fragment, null, React.createElement(input.Input, Object.assign({}, inputStyleProps, getInputProps(getDropdownProps({
    placeholder: placeholder,
    onClick: isOpen ? function () {} : openMenu,
    onFocus: isOpen ? function () {} : openMenu,
    ref: disclosureRef
  })))), !hideToggleButton && React.createElement(button.Button, Object.assign({}, toggleButtonStyleProps, getToggleButtonProps(), {
    "aria-label": 'toggle menu'
  }), React.createElement(icons.ArrowDownIcon, null)))), React.createElement(layout.Box, {
    pb: 4,
    mb: 4
  }, React.createElement(layout.List, Object.assign({
    bg: 'white',
    borderRadius: '4px',
    border: isOpen && '1px solid rgba(0,0,0,0.1)',
    boxShadow: '6px 5px 8px rgba(0,50,30,0.02)'
  }, listStyleProps, getMenuProps()), isOpen && inputItems.map(function (item, index) {
    return React.createElement(layout.ListItem, Object.assign({
      px: 2,
      py: 1,
      borderBottom: '1px solid rgba(0,0,0,0.01)'
    }, listItemStyleProps, {
      bg: highlightedIndex === index ? highlightItemBg : 'inherit',
      key: "" + item.value + index
    }, getItemProps({
      item: item,
      index: index
    })), isCreating ? createItemRenderer(item.label) : React.createElement(layout.Box, {
      display: 'inline-flex',
      alignItems: 'center'
    }, selectedItemValues.includes(item.value) && React.createElement(layout.ListIcon, Object.assign({
      as: icon || icons.CheckCircleIcon,
      color: 'green.500',
      role: 'img',
      display: 'inline',
      "aria-label": 'Selected'
    }, selectedIconProps)), itemRenderer ? itemRenderer(item) : React.createElement(Highlighter, {
      autoEscape: true,
      searchWords: [inputValue || ''],
      textToHighlight: defaultItemRenderer(item)
    })));
  }))));
};

exports.CUIAutoComplete = CUIAutoComplete;
//# sourceMappingURL=chakra-ui-autocomplete.cjs.development.js.map
