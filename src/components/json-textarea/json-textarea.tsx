import React, { useState, useCallback } from 'react'
import swal from 'sweetalert'

const styles = require('./style.css').default
const scriptText = require('./script.txt').default

type JSONTextareaProp = {
  onUpload(val: string): void
}

function doCopy(text: string) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', text)
  input.select()
  input.setSelectionRange(0, input.value.length)
  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  document.body.removeChild(input);
}

function JSONTextarea({ onUpload }: JSONTextareaProp) {
  const [json, setJson] = useState('')
  const onEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim()
    try {
      JSON.parse(value)
    } catch (e) {
      alert('json invalid')
      return
    }

    setJson(value)
  }
  const doUpload = useCallback(() => {
    onUpload(JSON.parse(json))
  }, [json])

  const copyAction = useCallback(() => {
    swal({
      icon: 'warning',
      title: '暂未实现该功能'
    })
    // doCopy(scriptText)
  }, [scriptText])

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h5 className={styles.title}>json 解码</h5>
          <p>拷贝进 json array. keys: fromURL, fromID, text, img, cate</p>
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={copyAction}>copy</button>
      </div>

      <textarea className={styles.editor + ' my-4 border border-grey-500'} onChange={onEditorChange} value={json} />
      <button disabled={json === ''} className={styles.confirm} onClick={doUpload}>upload</button>
    </section>
  )
}

export default JSONTextarea

