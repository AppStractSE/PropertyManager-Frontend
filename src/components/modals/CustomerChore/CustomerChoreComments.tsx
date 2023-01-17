export function CustomerChoreComments({ data }: any) {
  return (
    <div className='chore-comments'>
      {data.map((data: any) => (
        <div key={data.id} className='chore-comment-container'>
          <div className='d-flex align-items-center gap-1'>
            <div className='p fw-bold'>Niklas P</div> {/* Insert user here instead of hard coded */}
            <div className='p small text-muted'>{data.time.slice(0, 16).replace("T", " - ")}</div>
          </div>
          <div className='p'>{data.message}</div>
        </div>
      ))}
    </div>
  );
}
