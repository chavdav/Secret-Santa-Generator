package com.temporary.santa.dbmgmt.group;

import com.temporary.santa.dbmgmt.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
	
	@Autowired
	private GroupService groupService;

	@RequestMapping("/create")
	public Group createGroup(@RequestParam String groupName, @RequestParam String groupPass, @RequestParam String maxAmount, @RequestParam String releaseDate) {
		return groupService.createGroup(groupName, groupPass, maxAmount, releaseDate);
	}

	@RequestMapping("/retrieve")
	public Group retrieveGroup(@RequestParam String groupName, @RequestParam String groupPass) {
		return groupService.retrieveGroup(groupName, groupPass);
	}

	@RequestMapping("/addUserToGroup")
	public Group addUserToGroup(@RequestParam String groupName, @RequestParam String groupPass, @RequestParam String firstName,
								@RequestParam String lastName, @RequestParam String email, @RequestParam String wishlist) {
		User u = new User(firstName, lastName, email, wishlist, null);
		Group g = groupService.addUserToGroup(groupName, groupPass, u);
		u.sendEmail(g);
		return g;
	}
	
}
