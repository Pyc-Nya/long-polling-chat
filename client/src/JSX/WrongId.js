import BackButon from "./BackButton"

export default function WrongId() {
  return (
    <div className="wrong-id">
      It seems like user with such id does not exist
      <BackButon />
    </div>
  )
}
