function Card({ children, className = '', ...props }) {
  return (
    <section className={`cq-card ${className}`.trim()} {...props}>
      {children}
    </section>
  )
}

export default Card
