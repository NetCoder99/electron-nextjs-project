import Header from "./header"

const Layout = ({children}) => (
  <>
    <Header></Header>
    <main>{children}</main>
  </>
)

export default Layout