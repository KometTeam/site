import React from 'react';

import floppyAvatar from '../pfps/floppy.png';
import inkAvatar from '../pfps/ink.png';
import jganenokAvatar from '../pfps/jganenok.png';
import kilobyteAvatar from '../pfps/kilobyte.png';
import klockyAvatar from '../pfps/klocky.png';
import mixottAvatar from '../pfps/mixott.png';
import nxznAvatar from '../pfps/nxzn.png';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Floppy',
      role: 'Руководитель проекта',
      avatar: floppyAvatar
    },
    {
      name: 'Ink',
      role: 'Исследование API и документация',
      avatar: inkAvatar
    },
    {
      name: 'Jganenok',
      role: 'Фуллстек-разработчик',
      avatar: jganenokAvatar
    },
    {
      name: 'Килобайт',
      role: 'Фронтенд-разработчик',
      avatar: kilobyteAvatar
    },
    {
      name: 'Klocky',
      role: 'Главный разработчик, основатель',
      avatar: klockyAvatar
    },
    {
      name: 'Mixott',
      role: 'Разработка API и сервера',
      avatar: mixottAvatar
    },
    {
      name: 'Nxzn',
      role: 'Разработка сайт и клиента',
      avatar: nxznAvatar
    }
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">Наша команда</h2>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-avatar">
                <img 
                  src={member.avatar} 
                  alt={`${member.name} avatar`}
                  className="avatar-image"
                />
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-background">
        <div className="text-row">
          <div className="diagonal-text solid">Красивый</div>
          <div className="diagonal-text solid">Современный</div>
          <div className="diagonal-text solid">Продуманный</div>
          <div className="diagonal-text solid">Удобный</div>
          <div className="diagonal-text solid">Быстрый</div>
          <div className="diagonal-text solid">Безопасный</div>
        </div>
        
        <div className="text-row">
          <div className="diagonal-text outlined">Красивый</div>
          <div className="diagonal-text outlined">Современный</div>
          <div className="diagonal-text outlined">Продуманный</div>
          <div className="diagonal-text outlined">Удобный</div>
          <div className="diagonal-text outlined">Быстрый</div>
          <div className="diagonal-text outlined">Безопасный</div>
        </div>
      </div>
    </section>
  );
};

export default Team;
