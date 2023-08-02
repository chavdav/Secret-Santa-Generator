package com.temporary.santa.notifications;

import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.temporary.santa.dbmgmt.group.Group;
import com.temporary.santa.dbmgmt.group.GroupRepository;
import org.springframework.stereotype.Component;

@Component
public class GroupAssignmentsScheduler {

	@Autowired
	private GroupRepository groupRepository;

	/**
	 * Every hour, just b/c heroku spins down our app when inactive, so hopefully
	 * this will ensure we send the notifications in a somewhat timely manner.
	 */
	@Scheduled(cron = "0 0 * * * *", zone = "GMT-5:00")
	// @Scheduled(fixedRate = 10000)
	public void groupAssignments() {
		System.out.println("NOTIFY USERS FOR GROUP ASSIGNMENTS SCHEDULED TASK RUNNING");
		List<Group> groups = groupRepository.findAll();

		// today
		LocalDate ld = LocalDate.now();

		for (Group g : groups) {
			if (!g.usersHaveBeenNotified() && (ld.isAfter(g.getReleaseDate()) || ld.isEqual(g.getReleaseDate()))) {
				g.notifyUsers();
				groupRepository.save(g);
			}
		}
	}

//	 @Scheduled(fixedRate = 5000)
//	 public void testScheduler() {
//	 	System.out.println("PRINTING SCHEDULED CALL EVERY 5");
//		 List<Group> groups = groupRepository.findAll();
//		 for(Group g : groups) {
//			System.out.println(g.getGroupName());
//		 }
//	 }

}
