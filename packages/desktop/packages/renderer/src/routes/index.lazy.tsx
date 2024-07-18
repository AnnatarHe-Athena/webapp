import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <img src='athena://wx2.sinaimg.cn/mw690/717f76e5gy1hrfkz189qqj22c0340npe.jpg' referrerPolicy='no-referrer' />
    </div>
  )
}
