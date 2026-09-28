import Button from 'react-bootstrap/Button';
import React from 'react';

const LoadingButton = React.forwardRef(({
  color = "primary",
  text = 'Cargar',
  loadingText = 'Cargando',
  isLoading = false,
  onClick,
  className,
  type = 'button'
}, ref) => {
  return (
    <Button
      ref = {ref}
      type = {type}
      variant= {color}
      disabled={isLoading}
      onClick={onClick}
      className={`${className || ''}`}
    >
      {isLoading ? loadingText:text}
    </Button>
  );
});

LoadingButton.displayName = 'chargingButton';

export default LoadingButton;