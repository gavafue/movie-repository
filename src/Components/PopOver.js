import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function PopoverPositionedExample() {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key={top}
        top={top}
        overlay={
          <Popover id={`popover-positioned-${top}`}>
            <Popover.Header as="h3">{`Popover ${top}`}</Popover.Header>
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="secondary">Popover on {top}</Button>
      </OverlayTrigger>
    </>
  );
}

export default PopoverPositionedExample;
