export default function Container({ children, config }) {
    return <div className={"container mx-auto px-12 z-20 "+config}>{children}</div>
}