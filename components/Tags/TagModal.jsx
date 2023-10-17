const TagModal = ({ tags, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Tags:</h3>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TagModal;