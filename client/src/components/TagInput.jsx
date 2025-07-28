import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimeters = [KeyCodes.comma, KeyCodes.enter];

function TagInput({ tags, setTags, suggetions }) {
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div className='mb-3'>
      <label className='form-label'>Tags</label>
      <ReactTags
        tags={tags}
        suggestions={suggetions}
        delimiters={delimeters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition='inline'
        placeholder='Add a tag and press Enter'
        autocomplete
      />
    </div>
  );
}

export default TagInput;
