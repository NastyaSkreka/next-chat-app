function ParticipantsSidebar() {
  return (
    <div>
      <div className="flex flex-row items-center h-[50px]  bg-black p-5 w-full">
        <p className="text-white flex-1">Participants</p>
      </div>
      <div className="w-[250px] bg-black p-5">
        <div className="flex flex-col space-y-5">
          <div className="text-sm text-white">Online Users</div>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
              <p className="text-lg font-semibold text-white mb-1">Nastya</p>
              <p className="text-sm text-gray-400">Hello</p>
            </div>
          </div>
          <div className="text-sm text-white">Offline Users</div>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
              <p className="text-lg font-semibold text-white mb-1">
                Anastasiia
              </p>
              <p className="text-sm text-gray-400">hi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsSidebar;
