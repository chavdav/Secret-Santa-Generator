package com.temporary.santa.dbmgmt.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.temporary.santa.dbmgmt.group.Group;
import com.temporary.santa.dbmgmt.group.GroupService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/create")
	public User createUser(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email,
			@RequestParam String wishlist, @RequestParam(required = false) String blacklistNames) {
		User u = new User(firstName, lastName, email, wishlist, null);
		return userService.createUser(u);
	}

	@RequestMapping("/addToGroup")
	public Group addToGroup(@RequestParam String groupName, @RequestParam String groupPass,
			@RequestParam String firstName, @RequestParam String lastName, @RequestParam String userEmail,
			@RequestParam String wishlist, @RequestParam(required = false) String blacklistNames) {
		User u = new User(firstName, lastName, userEmail, wishlist, null);
		return userService.addToGroup(groupName, groupPass, u);
	}
}
