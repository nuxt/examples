export default defineComponent({
  props: {
    message: String
  },
  // @ts-expect-error investigate why this is not typed
  render(props) {
    return (
    <div>
      { props.message }
    </div>
    )
  }
})
