import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import calendarStyles from '../styles/calendar.module.css';
import layoutStyles from '../styles/layout.module.css';

const CalendarPage = ({ tasks, onSaveTask, onDeleteTask, setActivePage, loading }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const prevMonthDays = daysInMonth(year, month - 1);
    const days = [];

    // Previous month's trailing days
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: month - 1,
        year: year,
        currentMonth: false
      });
    }

    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        currentMonth: true
      });
    }

    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        month: month + 1,
        year: year,
        currentMonth: false
      });
    }

    return days;
  };

  const calendarDays = renderCalendar();
  const today = new Date();

  const getTasksForDay = (day, month, year) => {
    return tasks.filter(task => {
      // Map "Today", "Tomorrow" etc to actual dates for comparison
      let taskDate;
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (task.date === 'Today') {
        taskDate = new Date(now);
      } else if (task.date === 'Tomorrow') {
        taskDate = new Date(now);
        taskDate.setDate(now.getDate() + 1);
      } else if (task.date === 'Next Week') {
        taskDate = new Date(now);
        taskDate.setDate(now.getDate() + 7);
      } else if (task.date && !isNaN(Date.parse(task.date))) {
        taskDate = new Date(task.date);
      } else {
        return false;
      }

      return taskDate.getDate() === day && 
             taskDate.getMonth() === month && 
             taskDate.getFullYear() === year;
    });
  };

  const openEditModal = (e, task) => {
    e.stopPropagation();
    setEditingTask({ ...task, id: task._id || task.id });
    setIsModalOpen(true);
  };

  const openAddModal = (day, month, year) => {
    // For now we just open the modal. 
    // Ideally we'd pass the date, but TaskModal uses presets.
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className={layoutStyles.mainContent}>
      <Header 
        title="Calendar" 
        onAddTask={() => { setEditingTask(null); setIsModalOpen(true); }} 
        onProfileClick={() => setActivePage('profile')}
      />
      
      <div className={calendarStyles.calendarContainer}>
        <div className={calendarStyles.calendarHeader}>
          <div className={calendarStyles.monthTitle}>
            <CalendarIcon size={24} color="var(--primary-color)" />
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          </div>
          <div className={calendarStyles.navigationButtons}>
            <button className={calendarStyles.navBtn} onClick={prevMonth}>
              <ChevronLeft size={20} />
            </button>
            <button className={calendarStyles.navBtn} onClick={goToToday}>
              Today
            </button>
            <button className={calendarStyles.navBtn} onClick={nextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={calendarStyles.calendarGrid}>
          {daysOfWeek.map(day => (
            <div key={day} className={calendarStyles.dayOfWeek}>
              {day}
            </div>
          ))}
          
          {calendarDays.map((dateObj, index) => {
            const isToday = today.getDate() === dateObj.day && 
                            today.getMonth() === dateObj.month && 
                            today.getFullYear() === dateObj.year;
            
            const tasksForDay = getTasksForDay(dateObj.day, dateObj.month, dateObj.year);

            return (
              <div 
                key={index} 
                className={`${calendarStyles.calendarCell} ${!dateObj.currentMonth ? calendarStyles.notCurrentMonth : ''} ${isToday ? calendarStyles.today : ''}`}
                onClick={() => openAddModal(dateObj.day, dateObj.month, dateObj.year)}
              >
                <span className={calendarStyles.dayNumber}>{dateObj.day}</span>
                <div className={calendarStyles.tasksList}>
                  {tasksForDay.slice(0, 3).map(task => (
                    <div 
                      key={task._id || task.id} 
                      className={`${calendarStyles.taskItem} ${task.priority ? calendarStyles['priority_' + task.priority] : ''}`}
                      onClick={(e) => openEditModal(e, task)}
                    >
                      {task.title}
                    </div>
                  ))}
                  {tasksForDay.length > 3 && (
                    <div className={calendarStyles.taskItem} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                      + {tasksForDay.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Today Button */}
      <div className={calendarStyles.todayFloatingBtn} onClick={goToToday} title="Go to Today">
        <span className={calendarStyles.todayDate}>{today.getDate()}</span>
        <span className={calendarStyles.todayLabel}>Today</span>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }} 
        onSaveTask={onSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default CalendarPage;
