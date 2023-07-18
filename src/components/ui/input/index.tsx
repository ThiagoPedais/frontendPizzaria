import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss';



interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }
interface TextAreaProps extends TextareaHTMLAttributes<HTMLInputElement> { }

const Input = ({ ...rest }: InputProps) => {
  return (
    <input type="text" className={styles.input} {...rest} />
  )
}

const TextArea = ({ ...rest }: TextAreaProps) => {
  return (
    <textarea className={styles.input} {...rest}></textarea>
  )
}

export { Input, TextArea };