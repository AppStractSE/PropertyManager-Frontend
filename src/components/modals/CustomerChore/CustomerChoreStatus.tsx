export function CustomerChoreStatus({ chorestatuses, customerchore }: any) {
  return (
    <>
      {(() => {
        if (chorestatuses.length === customerchore.frequency) {
          return <div className='p'>Klar</div>;
        } else if (chorestatuses.length > 0) {
          return (
            <>
              <div className='p'>Påbörjad</div>
              <div className='p fst-italic '>
                Har gjorts {chorestatuses.length} av {customerchore.frequency} gånger
              </div>
            </>
          );
        } else {
          return <div className='p'>Ej påbörjad</div>;
        }
      })()}
    </>
  );
}
