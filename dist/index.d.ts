import * as React from 'react';
import { UseMultipleSelectionProps } from 'downshift';
import { FormLabelProps } from '@chakra-ui/form-control';
import { BoxProps } from '@chakra-ui/layout';
import { ButtonProps } from '@chakra-ui/button';
import { InputProps } from '@chakra-ui/input';
import { IconProps } from '@chakra-ui/icons';
import { TagProps } from '@chakra-ui/tag';
import { ComponentWithAs } from '@chakra-ui/react';
export interface Item {
    label: string;
    value: string;
}
export interface CUIAutoCompleteProps<T extends Item> extends UseMultipleSelectionProps<T> {
    items: T[];
    placeholder: string;
    label: string | false;
    highlightItemBg?: string;
    onCreateItem?: (item: T) => void;
    optionFilterFunc?: (items: T[], inputValue: string) => T[];
    itemRenderer?: (item: T) => string | JSX.Element;
    labelStyleProps?: FormLabelProps;
    inputStyleProps?: InputProps;
    toggleButtonStyleProps?: ButtonProps;
    tagStyleProps?: TagProps;
    listStyleProps?: BoxProps;
    listItemStyleProps?: BoxProps;
    emptyState?: (inputValue: string) => React.ReactNode;
    selectedIconProps?: Omit<IconProps, 'name'> & {
        icon: IconProps['name'] | React.ComponentType;
    };
    icon?: ComponentWithAs<'svg', IconProps>;
    hideToggleButton?: boolean;
    createItemRenderer?: (value: string) => string | JSX.Element;
    disableCreateItem?: boolean;
    renderCustomInput?: (inputProps: any, toggleButtonProps: any) => JSX.Element;
}
export declare const CUIAutoComplete: <T extends Item>(props: CUIAutoCompleteProps<T>) => React.ReactElement<CUIAutoCompleteProps<T>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;