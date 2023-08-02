import '../styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Samgyeopnal',
  description: 'Rediscover & Explore Home Recipes',
}

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="assets/images/logo_bg.svg"
          type="image/svg"
        />
      </head>
      <body>
        <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  )
}
