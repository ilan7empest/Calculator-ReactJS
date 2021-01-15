export const svgSelector = (type) => {
  switch (type) {
    case 'DIVIDE':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 0 24 24'
          width='24'>
          <path
            clipRule='evenodd'
            d='M5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12Z'
            fillRule='evenodd'
          />
          <path d='M14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z' />
          <path d='M14 17C14 18.1046 13.1046 19 12 19C10.8954 19 10 18.1046 10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17Z' />
        </svg>
      );
    case 'MULTIPLY':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 0 24 24'
          width='24'>
          <path
            clipRule='evenodd'
            d='M16.9497 7.05028C17.3402 7.4408 17.3402 8.07397 16.9497 8.46449L8.46443 16.9498C8.07391 17.3403 7.44074 17.3403 7.05022 16.9498C6.65969 16.5592 6.65969 15.9261 7.05022 15.5356L15.5355 7.05028C15.926 6.65975 16.5592 6.65975 16.9497 7.05028Z'
            fillRule='evenodd'
          />
          <path
            clipRule='evenodd'
            d='M7.05022 7.05028C7.44074 6.65975 8.07391 6.65975 8.46443 7.05028L16.9497 15.5356C17.3402 15.9261 17.3402 16.5592 16.9497 16.9498C16.5592 17.3403 15.926 17.3403 15.5355 16.9498L7.05022 8.46449C6.65969 8.07397 6.65969 7.4408 7.05022 7.05028Z'
            fillRule='evenodd'
          />
        </svg>
      );
    default:
      break;
  }
};
