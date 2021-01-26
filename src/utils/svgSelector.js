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
          viewBox='0 0 24 24'
          height='24'
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
    case 'BACKSPACE':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 48 48'
          width='24'
          height='24'>
          <path d='M0 0h48v48H0z' fill='none' />
          <path d='M44 6H14c-1.38 0-2.47.7-3.19 1.76L0 23.99l10.81 16.23C11.53 41.28 12.62 42 14 42h30c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-6 25.17L35.17 34 28 26.83 20.83 34 18 31.17 25.17 24 18 16.83 20.83 14 28 21.17 35.17 14 38 16.83 30.83 24 38 31.17z' />
        </svg>
      );
    case 'PERCENTAGE':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          enableBackground='new 0 0 64 64'
          height='18px'
          id='Layer_1'
          version='1.1'
          viewBox='0 0 64 64'
          width='18px'>
          <path d='M11.468,63.315c1.253,1.108,3.3,0.843,4.57-0.596l44.5-50.317c1.271-1.437,1.286-3.501,0.032-4.61l-8.038-7.109  c-1.253-1.108-3.3-0.841-4.571,0.596L3.462,51.597c-1.271,1.439-1.286,3.501-0.032,4.609L11.468,63.315z' />
          <circle cx='11.167' cy='11.167' r='11.167' />
          <circle cx='52.833' cy='52.833' r='11.167' />
        </svg>
      );
    default:
      break;
  }
};
