const OfferList = ({ text }: { text: string }) => {
  if (text === '') {
    return <p className={`mb-1 text-base text-body-color dark:text-dark-6`}>&nbsp;</p>;
  }
  return (
    <p className={`mb-1 text-base text-body-color dark:text-dark-6`}>{text}</p>
  );
};

export default OfferList;
