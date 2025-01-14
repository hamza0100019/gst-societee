import React from 'react'
import { Outlet } from 'react-router-dom'
export default function layout() {
  return (
<>
<header>
header
</header>
<main>
  <Outlet/>
  </main>
  <footer>
    footer
  </footer>
</>
  )
}
