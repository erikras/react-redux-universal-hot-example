'use strict';

export default (theme) => {
  return {
    base: {
      display: 'inline-block',
      fontSize: '18px',
      fontFamily: theme.typo.font,
      fontWeight: 400,
      textTransform: 'uppercase',
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',
      marginTop: '3px',
      minWidth: theme.spacing.desktopKeylineIncrement * 2,
      border: 'none',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '5px',
      paddingBottom: '5px',
      color: theme.palette.textColor,
      backgroundColor: theme.palette.primary1Color,
      borderRadius: theme.shapes.defaultBorderRadius,
      ':hover': {
        backgroundColor: theme.palette.primary3Color,
      },
      ':focus': {
        backgroundColor: theme.palette.primary3Color,
      },
      ':active': {
        backgroundColor: theme.palette.primary3Color,
      }
    },
    small: {
      paddingLeft: '15px',
      paddingRight: '15px'
    },
    accept: {
      fontWeight: 'bold',
    },
    cancel: {
      fontStyle: 'italic',
    }
  }
};
