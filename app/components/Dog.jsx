export default function Dog(props) {
  return (
    //<div className="w-full p-1 md:p-2">
    <img
      src={props.src}
      alt=""
      className="block h-full w-full rounded-lg object-cover object-center"
    />
    //</div>
  );
}
