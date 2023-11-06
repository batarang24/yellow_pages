import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import "./css/color.css"
 function Colors() {
  const [color, setColor] = useColor("#561ecb");

  return <ColorPicker color={color} hideAlpha hideInput height={200} onChange={setColor} />;
}
export default Colors