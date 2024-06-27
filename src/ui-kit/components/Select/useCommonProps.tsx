import { useMemo } from 'react';
import { omit } from 'lodash';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';

import { getCSSVariable } from '../../utils';
import { ISelectProps } from './Select';
import { ISelectOption } from './types';
import { useTheme } from '../../hooks/useTheme';

export const useCommonProps = <OptionType extends ISelectOption>({
  disabled,
  menuPlacement,
  menuPosition,
  onChange,
  options,
  small,
  placeholder,
  centerOptinons,
  ...rest
}: ISelectProps<OptionType>): Partial<ISelectProps<OptionType>> => {
  const { theme } = useTheme();
  const mainFont = getCSSVariable('--font-primary');

  const colors = useMemo(
    () => ({
      emphasisPrimary: getCSSVariable('--emphasis-primary'),
      emphasisSecondary: getCSSVariable('--emphasis-secondary'),
      emphasisTertiary: getCSSVariable('--emphasis-tertiary'),
      emphasisQuaternary: getCSSVariable('--emphasis-quaternary'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  const fontColor = disabled ? colors.emphasisQuaternary : colors.emphasisPrimary;

  return useMemo(() => {
    return {
      isDisabled: disabled,
      menuPlacement,
      menuPosition,
      onChange,
      placeholder,
      menuPortalTarget: document.body,
      components: {
        IndicatorSeparator: () => null,
        DropdownIndicator: ({ innerProps }) => (
          <div {...innerProps} className="ui-select__dropdown-indicator">
            <FaAngleDown size={small ? 14 : 18} color={colors.emphasisTertiary} />
          </div>
        ),
        ClearIndicator: ({ innerProps }) => (
          <div {...innerProps} className="ui-select__clear-indicator">
            <FaXmark size={small ? 14 : 18} color={colors.emphasisTertiary} />
          </div>
        ),
        ...rest?.components,
      },
      options,
      classNamePrefix: 'ui-select',
      styles: {
        control: (style) => ({
          ...style,
          boxShadow: 'none',
          border: 'none',
          '&:hover': {
            borderColor: 'none',
          },
          background: 'transparent',
          minHeight: '26px',
          color: fontColor,
        }),
        valueContainer: (style) => ({
          ...style,
          padding: 0,
        }),
        indicatorsContainer: (style) => ({
          ...style,
          alignItems: 'center',
          gap: small ? '6px' : '8px',
          marginTop: 0,
          cursor: 'pointer',
        }),
        input: (style) => ({
          ...style,
          color: fontColor,
          fontFamily: mainFont,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        singleValue: (style) => ({
          ...style,
          color: fontColor,
          fontFamily: mainFont,
        }),
        placeholder: (style, state) => ({
          ...style,
          color: state.isFocused ? colors.emphasisSecondary : colors.emphasisQuaternary,
        }),
        menuList: (style) => ({
          ...style,
          fontFamily: mainFont,
          textAlign: centerOptinons ? 'center' : style.textAlign,
        }),
        option: (style) => ({
          ...style,
          fontFamily: mainFont,
          fontSize: small ? '14px' : style.fontSize,
          padding: small ? '6px 8px' : style.padding,
        }),
        menuPortal: (style) => ({ ...style, zIndex: 99, minWidth: '50px' }),
      },
      ...omit(rest, ['components', 'centerOptinons']),
    };
  }, [
    colors,
    centerOptinons,
    disabled,
    fontColor,
    small,
    mainFont,
    menuPlacement,
    menuPosition,
    onChange,
    options,
    placeholder,
    rest,
  ]);
};
