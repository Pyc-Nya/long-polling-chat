import BackButon from "./BackButton"

export default function WrongId() {
  return (
    <div className="wrong-id">
      <div className="sign__input-container">
        <div className="sign-button wrong-id__text">It seems like user with such id does not exist</div>
        <BackButon />
      </div>
    </div>
  )
}
