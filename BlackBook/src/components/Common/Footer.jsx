import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-black py-6 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} BlackBookEDU.ai. All rights reserved.
      </footer>
    </div>
  )
}

export default Footer