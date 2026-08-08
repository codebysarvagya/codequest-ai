function Button({ children, className = '', variant = 'primary', ...props }) {
  return (
    <button
      className={`cq-button cq-button--${variant} ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
