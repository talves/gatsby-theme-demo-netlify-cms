import React from 'react';

const RelationKitchenSinkPostPreview = ({ value, fieldsMetaData }) => {
  const [items, setItems] = React.useState([{}]);

  React.useEffect(
    () => {
      const posts = fieldsMetaData.getIn(['posts']);
      if (!value || !posts) {
        setItems([{}]);
      } else {
        const stuff = (typeof value === 'string') ? [value] : value
        const postsData = stuff.map(item => posts.getIn([item]).toJS())
        if (postsData) {
          setItems(postsData);
        }
      }
    },
    [fieldsMetaData, value]
  );

  return (
    items && (
      <div
        style={{
          border: '2px solid #ccc',
          borderRadius: '8px',
          padding: '20px'
        }}>
        <h2>{`Related Post${items.length > 1 ? 's' : ''}`}</h2>
      {items.map((post, index) => (
        <div key={index}>
        <h3>{post.title}</h3>
        {post.image && <img src={post.image} alt={post.title} />}
        <p>{`${post.body ? post.body.substr(0, 100) : 'Loading'}...`}</p>
        </div>
        ))
      }
      </div>
    )
  );
};

export default RelationKitchenSinkPostPreview;
